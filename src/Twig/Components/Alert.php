<?php

namespace SkPro\Standard\Twig\Components;

use Symfony\UX\TwigComponent\Attribute\AsTwigComponent;

#[AsTwigComponent(name:"alert")]
class Alert
{
    public string $type = 'success';
    public string $message;
}