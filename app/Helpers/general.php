<?php 
use Stichoza\GoogleTranslate\GoogleTranslate;
use Illuminate\Support\Facades\App;

if( !function_exists( '_t' ) ){
    function _t( $string, $locale = null ){

        if( !$locale ){
            $locale = App::getLocale();
        }

        return GoogleTranslate::trans( $string, $locale );
    }
}
