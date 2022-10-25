---
layout: "../../layouts/BlogPost.astro"
title: "Deferred Support for AmplifyJs"
description: ""
pubDate: "2013-03-11 13:25:08"
heroImage: ""
slug: "deferred-support-for-amplifyjs"
---

Working with AmplifyJs has been great, It reduces a lot caching headaches, We are using amplifyjs in conjunction with Durandal, and durandal uses jQuery deffereds and the logical step would be to have amplify requests to be deffereds, 
As Amplifyjs was built with the intention of not having jQuery as a Dependency, the deferred support is not included out of the box, but to introduce that is very simple,

Put this in before the making a request and you are good to go

<pre lang="javascript">
(function (amplify, $, undefined) {
	var properties = [ "types", "resources", "define", "decoders" ];
	amplify.request_original = amplify.request;
	amplify.request = function(resourceId, data) {
		var dfd = $.Deferred();

		amplify.request_original({
			resourceId: resourceId,
			data: data,
			success: dfd.resolve,
			error: dfd.reject
		});

		return dfd.promise();
	};

	$.each( properties, function( index, key ) {
		amplify.request[ key ] = amplify.request_original[ key ];
	});
})(amplify,jQuery);
</pre>

and you can make request like 

<pre lang="javascript">
 $.when(
        amplify.request("resourceId1"),
        amplify.request("resourceId2")
 ).then(function(response1, response2) {
     //do Something with response1.data
 });
</pre>
Source : <a href="http://www.elijahmanor.com/2012/10/adding-jquery-deferred-support-to.html">http://www.elijahmanor.com/2012/10/adding-jquery-deferred-support-to.html</a>
