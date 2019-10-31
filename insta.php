<?php

$instagram_business_id = '17841411986295166'; 
$access_token = 'EAAiAA2pT4HcBAKbwV9LPnstOBsS3SKDSKqIErtIZCChAcDFcNC97EoKHBRZCeUBFTGPOhe2OCy0D7bVYFUuKFZAvLCkZCRUfZBkn0deyZAHyEytIZCAISi83jgVq51P2iN7jfqZAXrnmqMJEOIfZAwVOxWuEOs4YlZBZBCOz1Uqyn4O1wZDZD';

$target_user = 'https://www.instagram.com/5elements_tokyo/';

//自分が所有するアカウント以外のInstagramビジネスアカウントが投稿している写真も取得したい場合は以下
// $query = 'business_discovery.username('.$target_user.'){id,followers_count,media_count,ig_id,media{caption,media_url,media_type,like_count,comments_count,timestamp,id}}';

//自分のアカウントの画像が取得できればOKな場合は$queryを以下のようにしてください。

$query = 'name,media{caption,like_count,media_url,permalink,timestamp,username}&access_token='.$access_token;



$instagram_api_url = 'https://graph.facebook.com/v3.3/';
$target_url = $instagram_api_url.$instagram_business_id."?fields=".$query."&access_token=".$access_token;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $target_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$instagram_data = curl_exec($ch);
curl_close($ch);

echo $instagram_data;
exit;