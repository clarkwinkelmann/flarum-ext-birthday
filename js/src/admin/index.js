import {extend} from 'flarum/extend';
import app from 'flarum/app';
import PermissionGrid from 'flarum/components/PermissionGrid';

app.initializers.add('clarkwinkelmann/flarum-ext-birthday', () => {
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('clarkwinkelmann-birthday', {
            icon: 'fas fa-birthday-cake',
            label: app.translator.trans('clarkwinkelmann-birthday.admin.permissions.see'),
            permission: 'clarkwinkelmann-birthday.see',
            allowGuest: true,
        });
    });

    extend(PermissionGrid.prototype, 'moderateItems', items => {
        items.add('clarkwinkelmann-birthday', {
            icon: 'fas fa-birthday-cake',
            label: app.translator.trans('clarkwinkelmann-birthday.admin.permissions.edit-anyone'),
            permission: 'clarkwinkelmann-birthday.edit-anyone',
        });
    });
});
