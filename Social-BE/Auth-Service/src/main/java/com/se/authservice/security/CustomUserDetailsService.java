package com.se.authservice.security;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.se.authservice.exception.ResourceNotFoundException;
import com.se.authservice.model.User;
import com.se.authservice.payload.ApiResponseEntity;
import com.se.authservice.util.UserServiceRestTemplateClient;


@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserServiceRestTemplateClient client;
    
    @Autowired
    private UserService userService;
    
    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {
        
    	User user = null;
		try {
			user = userService.findByEmail(email).orElseThrow(() ->
				new UsernameNotFoundException("User not found with email : " + email));
		} catch (UsernameNotFoundException | JsonProcessingException e1) {
			e1.printStackTrace();
		}
		
		
		if(user != null && user.getProvider() != AuthProvider.local) {
			throw new UsernameNotFoundException("User not login local with email : " + email);
		}
		
		return UserPrincipal.create(user);

    }

    public UserDetails loadUserById(Long id) throws JsonMappingException, JsonProcessingException {
        
    	User user = userService.findById(id.intValue());
    	
    	if(user == null) {
    		throw new ResourceNotFoundException("User", "id", id);
    	}

        return UserPrincipal.create(user);
    }
}