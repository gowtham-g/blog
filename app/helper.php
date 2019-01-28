<?php

function helptags(){

return App\Model\help\HelpTag::pluck('name', 'id');

}