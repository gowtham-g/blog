<?php

namespace App\Http\Middleware;

use Closure;

class LoggedUserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $logged_user = $request->user();
        if(isset($logged_user)){
            return back();
        }
        return $next($request);
    }
}
