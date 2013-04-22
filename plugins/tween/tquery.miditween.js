tQuery.registerStatic('createTweenMidi', function(maxAge, attackTime, releaseTime){
	return function(age){
		if( age < attackTime ){
			return age / attackTime
		}else if( age < maxAge - releaseTime ){
			return 1;
		}else{
			return (maxAge - age) / releaseTime
		}
	}	
})