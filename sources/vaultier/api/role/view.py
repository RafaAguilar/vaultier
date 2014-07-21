from rest_framework.permissions import BasePermission, IsAuthenticated
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.serializers import ModelSerializer, NestedValidationError,ValidationError
from rest_framework.viewsets import ModelViewSet
from vaultier.api.card.view import RelatedCardSerializer
from vaultier.api.relatednestedfield import RelatedNestedField
from vaultier.api.member.view import RelatedMemberSerializer
from vaultier.api.transactionmixin import AtomicTransactionMixin
from vaultier.api.user.view import RelatedUserSerializer
from vaultier.api.vault.view import RelatedVaultSerializer
from vaultier.api.workspace.view import RelatedWorkspaceSerializer
from vaultier.auth.authentication import TokenAuthentication
from vaultier.models.acl.fields import AclLevelField
from vaultier.models.member.model import Member
from vaultier.models.role.model import Role
from vaultier.perms.check import has_object_acl


class CanManageRolePermission(BasePermission):
    def has_object_permission(self, request, view, role):

        object = role.get_object()
        result = has_object_acl(request.user, object, AclLevelField.LEVEL_WRITE)

        return result


class RoleSerializer(ModelSerializer):
    created_by = RelatedNestedField(serializer=RelatedUserSerializer, required=False, read_only=True)
    member = RelatedNestedField(required=True, serializer=RelatedMemberSerializer, queryset=Member.objects.all())
    to_workspace = PrimaryKeyRelatedField(required=False, read_only=False)
    to_vault = PrimaryKeyRelatedField(required=False, read_only=False)
    to_card = PrimaryKeyRelatedField(required=False, read_only=False)

    def validate(self, attrs):
        if not (attrs.get('to_workspace') or attrs.get('to_vault') or attrs.get('to_card')):
            raise ValidationError('At least one of to_workspace, to_vault, to_card has to be set')

        return attrs

    def save_object(self, obj, **kwargs):
        try:
            obj.compute_type()
        except:
            raise NestedValidationError('Role has to be related to_workspace or to_vault or to_card')
        self.object = Role.objects.create_or_update_role(obj)

    class Meta:
        model = Role
        fields = ('id', 'level', 'member', 'to_workspace', 'to_vault', 'to_card',
                  'created_by', 'created_at', 'updated_at',)


class RoleUpdateSerializer(RoleSerializer):
    def validate(self, attrs):
        return attrs

    def get_fields(self):
        fields = super(RoleUpdateSerializer, self).get_fields()
        for field in fields:
            if not field == 'level':
                fields[field].read_only = True
        return fields


class MemberRolesSerializer(RoleSerializer):
    member = RelatedNestedField(required=True, serializer=RelatedMemberSerializer, queryset=Member.objects.all())
    to_workspace = RelatedNestedField(required=False, read_only=False, serializer=RelatedWorkspaceSerializer)
    to_vault = RelatedNestedField(required=False, read_only=False, serializer=RelatedVaultSerializer)
    to_card = RelatedNestedField(required=False, read_only=False, serializer=RelatedCardSerializer)


class RoleViewSet(
    AtomicTransactionMixin,
    ModelViewSet):
    model = Role
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated, CanManageRolePermission)
    filter_fields = ('to_workspace', 'to_vault', 'to_card', 'level',)
    serializer_class = RoleSerializer

    def get_serializer_class(self):
        if self.action == 'update' or self.action == 'partial_update':
            return RoleUpdateSerializer
        elif self.action == 'list' and self.request.QUERY_PARAMS.get('to_member', None):
            return MemberRolesSerializer
        else:
            return super(RoleViewSet, self).get_serializer_class()

    def pre_save(self, object):
        self.check_object_permissions(self.request, object)
        if not object.pk:
            object.created_by = self.request.user;
        return super(RoleViewSet, self).pre_save(object)

    def get_queryset(self):
        member_id = self.request.QUERY_PARAMS.get('to_member')
        if member_id:
            queryset = Role.objects.all_for_member(member_id)
        else:
            queryset = Role.objects.all_for_user(self.request.user)
        return queryset
