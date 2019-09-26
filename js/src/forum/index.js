import {extend} from 'flarum/extend';
import app from 'flarum/app';
import UserCard from 'flarum/components/UserCard';
import Button from 'flarum/components/Button';
import UserControls from 'flarum/utils/UserControls';
import icon from 'flarum/helpers/icon';
import {BirthdayModal} from './components/BirthdayModal';

app.initializers.add('clarkwinkelmann/flarum-ext-birthday', () => {
    extend(UserControls, 'userControls', (items, user) => {
        if (user.attribute('clarkwinkelmannBirthdayCanEdit')) {
            items.add('clarkwinkelmann-birthday', Button.component({
                icon: 'fas fa-birthday-cake',
                children: app.translator.trans('clarkwinkelmann-birthday.forum.settings.link'),
                onclick() {
                    app.modal.show(new BirthdayModal(user));
                },
            }));
        }
    });

    extend(UserCard.prototype, 'infoItems', function (items) {
        if (this.props.user.attribute('clarkwinkelmannBirthday')) {
            const birthday = this.props.user.attribute('clarkwinkelmannBirthday');

            let date;
            let format = 'Do MMMM';

            if (birthday.length === 10) {
                date = moment(birthday);
                format += ' YYYY';
            } else {
                date = moment('2000-' + birthday);
            }

            items.add('clarkwinkelmann-birthday', m('span', [
                icon('fas fa-birthday-cake'),
                ' ',
                date.format(format),
            ]));
        }
    });
});
