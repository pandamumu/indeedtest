<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Redirect,Response;

class TestController extends Controller
{
    public function postQuery(Request $request){
    	$validated = $request->validate([
	        'url' => 'required',
	    ]);
    	$client = new \GuzzleHttp\Client();
    	$res = $client->get($request->url);
    	$content = (string) $res->getBody();

    	$arr = json_decode($content, true);

    	$data = array();

    	$data['content'] = $content;
    	$data['inverted'] = json_encode(array_reverse($arr));

    	return $data;
    }
}
