<?php

namespace ClarkWinkelmann\Birthday\Extenders;

use Carbon\Carbon;
use ClarkWinkelmann\Birthday\Validators\BirthdayValidator;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Flarum\Foundation\ValidationException;
use Flarum\Locale\Translator;
use Flarum\User\AssertPermissionTrait;
use Flarum\User\Event\Saving;
use Illuminate\Contracts\Container\Container;
use Illuminate\Support\Arr;

class SaveUserAttributes implements ExtenderInterface
{
    use AssertPermissionTrait;

    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Saving::class, [$this, 'saveUser']);
    }

    public function saveUser(Saving $event)
    {
        $attributes = Arr::get($event->data, 'attributes', []);

        if (isset($attributes['birthday'])) {
            $this->assertCan($event->actor, 'editBirthday', $event->user);

            $birthday = $attributes['birthday'];

            if (empty($birthday)) {
                $birthday = null;
            }

            /**
             * @var $validator BirthdayValidator
             */
            $validator = app(BirthdayValidator::class);

            $validator->assertValid([
                'birthday' => $birthday,
            ]);

            // We can't easily check the date is a real date in the validator because year is optional
            // I could have created a custom validation rule for that, but instead I just manually did the check below
            if ($birthday) {
                $checkDate = $birthday;

                if (strlen($birthday) < 10) {
                    $checkDate = '2000-' . $checkDate;
                }

                $check = Carbon::parse($checkDate);

                // PHP is perfectly OK with invalid days of months, it simply slips forward (31 April becomes 1st May for example)
                // So to check if the day really exists, we compare the output in the same format as the input
                // If the day is valid, the strings will be identical. If it slipped, the month and day will no longer match
                if ($check->format('Y-m-d') !== $checkDate) {
                    /**
                     * @var $translator Translator
                     */
                    $translator = app(Translator::class);

                    throw new ValidationException([
                        'birthday' => $translator->trans('clarkwinkelmann-birthday.api.invalid-date'),
                    ]);
                }
            }

            $event->user->clarkwinkelmann_birthday = $birthday;
        }
    }
}
