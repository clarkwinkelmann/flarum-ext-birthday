<?php

use Flarum\Database\Migration;

return Migration::addColumns('users', [
    'clarkwinkelmann_birthday' => [
        'string',
        'length' => 10,
        'nullable' => true,
    ],
]);
