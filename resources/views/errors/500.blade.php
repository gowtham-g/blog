@extends('layouts.app')
@section('body_class')
    error-page
@endsection
@section('content')
    <link rel="stylesheet" href="/assets/css/error.css">
    <div class="main">
        <div class="container">
            <div class="dc bot-mspace"><a id="navbar-logo" class="dc" href="@{{ mainCtrl.laroute.route('welcome') }}"><span class="logo m-auto" alt="logo"> </span></a></div>
            <div class="page-error-img text-center">
                <img src="{{asset('/assets/img/erreor-page-500.png')}}" alt="">
            </div>
            <div class="errorContainer dc">
                <div class="pgNtFnd">Something went wrong.</div>

                @if(app()->bound('sentry') && !empty(Sentry::getLastEventID()))
                    <div class="subtitle return">Error ID: {{ Sentry::getLastEventID() }}</div>

                    <!-- Sentry JS SDK 2.1.+ required -->
                    <script src="https://cdn.ravenjs.com/3.3.0/raven.min.js"></script>

                    <script>
                        Raven.showReportDialog({
                            eventId: '{{ Sentry::getLastEventID() }}',
                            // use the public DSN (dont include your secret!)
                            dsn: 'https://e9ebbd88548a441288393c457ec90441@sentry.io/3235',
                            user: {
                                'name': 'Jane Doe',
                                'email': 'jane.doe@example.com',
                            }
                        });
                    </script>
                @endif
            </div>
        </div>
    </div>
    </div>
@endsection
