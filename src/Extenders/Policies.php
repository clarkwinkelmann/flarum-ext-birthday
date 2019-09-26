<?php

namespace ClarkWinkelmann\Birthday\Extenders;

use ClarkWinkelmann\Birthday\Policies\UserPolicy;
use Flarum\Extend\ExtenderInterface;
use Flarum\Extension\Extension;
use Illuminate\Contracts\Container\Container;

class Policies implements ExtenderInterface
{
    public function extend(Container $container, Extension $extension = null)
    {
        $container['events']->subscribe(UserPolicy::class);
    }
}
