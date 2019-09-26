<?php

namespace ClarkWinkelmann\Birthday\Validators;

use Flarum\Foundation\AbstractValidator;

class BirthdayValidator extends AbstractValidator
{
    protected $rules = [
        'birthday' => 'nullable|regex:~^([0-9]{4}-)?[0-9]{2}-[0-9]{2}$~',
    ];
}
