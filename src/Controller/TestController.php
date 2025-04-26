<?php

namespace SkPro\Standard\Controller;

use Symfony\Component\HttpFoundation\Response;
use Twig\Environment;

class TestController
{
    public function __construct(
        private readonly Environment $twig
    ){
    }

    public function __invoke():Response
    {
        return new Response(
            $this->twig->render('@Page/test.html.twig')
        );
    }
}