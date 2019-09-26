<?php

namespace ClarkWinkelmann\Birthday\Policies;

use Flarum\User\AbstractPolicy;
use Flarum\User\User;

class UserPolicy extends AbstractPolicy
{
    protected $model = User::class;

    function seeBirthday(User $actor, User $user)
    {
        return $this->editBirthday($actor, $user) || $actor->hasPermission('clarkwinkelmann-birthday.see');
    }

    function editBirthday(User $actor, User $user)
    {
        return $actor->id === $user->id || $actor->hasPermission('clarkwinkelmann-birthday.edit-anyone');
    }
}
