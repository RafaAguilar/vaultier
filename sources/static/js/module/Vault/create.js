Vaultier.VaultCreateRoute = Ember.Route.extend({
    actions: {
        save: function () {
            var workspace =  Vaultier.Services.Context.ContextService.current().workspace;
            var record = this.get('controller.content');
            record.set('workspace', workspace.id);

            record.save().then(
                function () {
                    $.notify('Your vault has been successfully created.', 'success');
                    this.transitionTo('VaultIndex', workspace.id);
                }.bind(this),
                function () {
                    $.notify('Oooups! Something went wrong.', 'error');
                }
            )
        }
    },

    setupController: function (ctrl, model) {
        this._super(ctrl, model);

        ctrl.set('env', Vaultier.Services.Context.ContextService.current());
        ctrl.set('breadcrumbs',
            Vaultier.utils.Breadcrumbs.create({router: this.get('router')})
                .addHome()
                .addCurrentWorkspace()
                .addLink('VaultCreate', 'Create new vault', { workspace: '_env'})
        )
    },

    model: function (params, queryParams) {
        return Vaultier.Services.Context.ContextService.current().executeRoute(this, params, queryParams).then(function () {
            var store = this.get('store');
            var record = store.createRecord('Vault');
            return record;
        }.bind(this));
    },

    deactivate: function () {
        var record = this.get('controller.content');
        if (!record.get('id')) {
            var store = this.get('store');
            store.deleteRecord(record);
        }
    }
});

Vaultier.VaultCreateController = Ember.ObjectController.extend({
    breadcrumbs: null,
    env: null
});

Vaultier.VaultCreateView = Ember.View.extend({
    templateName: 'Vault/Create',
    layoutName: 'Layout/LayoutStandard'
});
