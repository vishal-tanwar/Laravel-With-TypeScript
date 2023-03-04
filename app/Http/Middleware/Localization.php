<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class Localization
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {   
        $translations = config('translations');

        if ( $request->hasHeader("Accept-Language") && in_array( $request->header('Accept-Language'), $translations) ) {
            App::setLocale($request->header("Accept-Language"));
        }
        else{
            App::setLocale( App::getFallbackLocale() );
        }

        return $next($request);
    }
}
