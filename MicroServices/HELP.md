# Getting Started

### Start All Services with debug mode
    **** docker should be started ****
    cd docker
    run : docker-compose -f all-services.yml up -d
    remove everything:  docker-compose -f all-services.yml down -v --remove-orphans    
    remove all images:  docker rmi user-service offer-service

### Start All Services with production mode
    cd docker
    run: docker compose build
    run : docker compose up -d
    stop all services:  docker compose down (docker compose down -v)
    remove all images:  docker rmi docker-autoconfiguration-service docker-gateway-service docker-user-service docker-offer-service

### Step by Step
- Firstly start autoconfiguration
- start gateway service
- start user service
- start offer service

API Gateway backendUrl = http://localhost:8081
### Workflow Login: 
1) Frontend call Http request /authorization/keycloak
2) From route Api Gateway : /authorization/keycloak => forward:/auth/keycloak
3) @GetMapping({ "/keycloak" }) return url match with url oauth2.loginPage in SpringSecurity
4) Redirect from frontend to : document.location.href = `${backendUrl}${result.data?.url}
5) Redirect automatic to page login keycloak with query param: redirect_uri=http://localhost:8081/login/oauth2/code/keycloak
6) if success login, Redirect to keycloak with jwt
7) Redirect to backend server with session id
8) backend redirect to frontend with config success login in config security


### Session User
    session keycloak inside
    session backend inside


### Change hostname (keycloak) instead of localhost
    C:\Windows\System32\drivers\etc\: 127.0.0.1 keycloak
    Command Prompt as Administrator run: ipconfig /flushdns
