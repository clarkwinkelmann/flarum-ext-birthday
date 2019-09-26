import Modal from 'flarum/components/Modal';
import Select from 'flarum/components/Select';
import Button from 'flarum/components/Button';

export class BirthdayModal extends Modal {
    constructor(user) {
        super();

        this.user = user;

        this.year = 'unspecified';
        this.month = 'none';
        this.day = 'none';

        const birthday = this.user.attribute('clarkwinkelmannBirthday');

        if (birthday) {
            const matches = /^([0-9]{4})?-?([0-9]{2})-([0-9]{2})$/.exec(birthday);

            if (matches[1]) {
                this.year = matches[1];
            }
            this.month = matches[2];
            this.day = matches[3];
        }

        this.dirty = false;
        this.loading = false;
    }

    title() {
        return app.translator.trans('clarkwinkelmann-birthday.forum.settings.title');
    }

    content() {
        const dayOptions = {
            'none': app.translator.trans('clarkwinkelmann-birthday.forum.settings.choose'),
        };

        for (let i = 1; i <= 31; i++) {
            const dayWithZero = ('0' + i).substr(-2);
            dayOptions[dayWithZero] = dayWithZero;
        }

        const monthOptions = {
            'none': app.translator.trans('clarkwinkelmann-birthday.forum.settings.choose'),
        };

        for (let i = 1; i <= 12; i++) {
            const monthWithZero = ('0' + i).substr(-2);
            monthOptions[monthWithZero] = moment('2000-' + monthWithZero + '-01').format('MMMM');
        }

        const yearOptions = {
            'unspecified': app.translator.trans('clarkwinkelmann-birthday.forum.settings.unspecified'),
        };

        for (let i = 1900; i <= moment().format('YYYY'); i++) {
            yearOptions[i] = i;
        }

        return m('.Modal-body.Birthday-modal', [
            m('.Form-group', [
                m('label', app.translator.trans('clarkwinkelmann-birthday.forum.settings.label')),
                Select.component({
                    options: dayOptions,
                    onchange: value => {
                        this.day = value;
                        this.dirty = true;
                    },
                    value: this.day,
                }),
                Select.component({
                    options: monthOptions,
                    onchange: value => {
                        this.month = value;
                        this.dirty = true;
                    },
                    value: this.month,
                }),
                Select.component({
                    options: yearOptions,
                    onchange: value => {
                        this.year = value;
                        this.dirty = true;
                    },
                    value: this.year,
                }),
            ]),
            Button.component({
                disabled: !this.dirty,
                loading: this.loading,
                type: 'submit',
                className: 'Button Button--primary',
                children: app.translator.trans('clarkwinkelmann-birthday.forum.settings.submit'),
            }),
        ]);
    }

    onsubmit(e) {
        e.preventDefault();

        this.loading = true;

        let birthday = '';

        if (this.month !== 'none' && this.day !== 'none') {
            birthday = this.month + '-' + this.day;

            if (this.year !== 'unspecified') {
                birthday = this.year + '-' + birthday;
            }
        }

        this.user.save({
            birthday,
        }).then(() => {
            this.loading = false;
            this.dirty = false;
            m.redraw();
        }).catch(err => {
            this.loading = false;
            m.redraw();
            throw err;
        });
    }
}
