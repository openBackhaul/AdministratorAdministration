# AccessAdministration

### Location
The AccessAdministration is part of the TinyApplicationController.  
The TinyApplicationController is for managing the REST microservices of the application layer.  

### Description
Every request using BasicAuth must be approved by the AccessAdministration.  
This applies on OaM activities on any of the applications and out-of-MW-SDN-domain requests to any of the proxy applications.  
It is the central place for defining access rights of administrators and out-of-MW-SDN-domain applications.  

### Relevance
The AccessAdministration is core element of the application layer running in the live network at Telefonica Germany.  

### Resources
- [Specification](./spec/)
- [TestSuite](./testing/)
- [Implementation](./server/)

### Comments
./.
