
@if (session('success'))
    <script>

        iziToast.show({
            title: 'Success',
            message: '{{session('success')}}',
            color:'#00cc99',
            position: 'topRight'
        });
    </script>
@endif
@if (session('error'))
    <script>
        iziToast.show({
            title: 'Error',
            message: '{{session('error')}}',
            color:'#ff6666',
            position: 'topRight'
        });
    </script>
@endif