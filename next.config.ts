import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: "https",
        hostname: "developers.elementor.com",
        port: "",
        pathname: "/docs/assets/img/elementor-placeholder-image.png"
      },
      {
        protocol: "https",
        hostname: "img.magnific.com",
  
      }
 
    ]
    
  }
};

export default nextConfig;
