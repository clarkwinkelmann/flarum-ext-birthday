<?php

namespace ClarkWinkelmann\Birthday\Extenders;

use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class UserAttributes implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->listen(Serializing::class, [$this, 'attributes']);
    }

    public function attributes(Serializing $event)
    {
        if ($event->isSerializer(UserSerializer::class)) {
            $event->attributes['clarkwinkelmannBirthdayCanEdit'] = $event->actor->can('editBirthday', $event->model);

            if ($event->actor->can('seeBirthday', $event->model)) {
                $event->attributes['clarkwinkelmannBirthday'] = $event->model->clarkwinkelmann_birthday;
            }
        }
    }
}
