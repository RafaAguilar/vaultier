Vaultier.User = DS.Model.extend(
    CreatedUpdatedMixin,
    NonInvalidState,
    {
        email: DS.attr('string'),
        nickname: DS.attr('string')
    })

Vaultier.AuthenticatedUser = Vaultier.User.extend({
    public_key: DS.attr('string')
});

