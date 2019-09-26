<?php

namespace ClarkWinkelmann\Birthday;

use ClarkWinkelmann\Birthday\Extenders\Policies;
use ClarkWinkelmann\Birthday\Extenders\SaveUserAttributes;
use ClarkWinkelmann\Birthday\Extenders\UserAttributes;
use Flarum\Extend;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),
    new Extend\Locales(__DIR__ . '/resources/locale'),

    new Policies(),
    new SaveUserAttributes(),
    new UserAttributes(),
];
