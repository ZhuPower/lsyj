<?php  
header("Access-Control-Allow-Origin: *");  
header('Content-type:text/html;Charset=utf-8');  

   //获取地址链接中的code参数
    $location = $_SERVER["QUERY_STRING"];

    $arr_url = explode("&",$location);
    $data = $arr_url[0];
    $code = explode("=",$data)[1];
    $state = explode("=",$arr_url[1])[1];
    $state = base64_decode($state);

    //curl 的post请求
    function CurlPost($url, $data)
    {
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($curl, CURLOPT_SSLVERSION, CURL_SSLVERSION_TLSv1);
        curl_setopt($curl, CURLOPT_URL, $url);
        if(!empty($data))
        {
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $result = curl_exec($curl);
        curl_close($curl);
        return $result;
    }
        //get请求
    function CurlGet($url)
    {
        return CurlPost($url, "");
    }

    //通过code换取网页授权access_token
    $url = "https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxecf06a4829133fc6&secret=3d364041b6882cc6897c8c7d607fec2e&code=".$code."&grant_type=authorization_code";

    $rs = json_decode(CurlGet($url));

    //请求成功返回access_token
    if(isset($rs->{'access_token'})){
        //保存access_token
        $access_token = $rs->{'access_token'};
        $openid = $rs->{'openid'};
    //请求成功返回errcode
    }else if (isset($rs->{'errcode'})) {
        //# code...
    }

    //拉取用户信息(需scope为 snsapi_userinfo)
    $json_string = CurlGet("https://api.weixin.qq.com/sns/userinfo?access_token=".$access_token."&openid=".$openid."&lang=zh_CN");
    //$arr = json_decode($json_string, true);
    //var_dump($openid);
    $url1 = $state."&openId=".$openid;
    echo $url1;
    header("location:".$url1);
    //echo $json_string;
?>