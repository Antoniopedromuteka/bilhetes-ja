﻿using System;
using System.Security.Claims;

namespace bilhetesja_api.Extensions
{
    
    namespace bilhetesja_api.Extensions
    {
        public static class ClaimsPrincipalExtensions
        {
            public static int GetUserId(this ClaimsPrincipal user)
            {
                return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
            }
        }
    }

}
