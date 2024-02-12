# AccessAdministration Specification

### Diagrams  
- [Collection of Diagrams](./diagrams)

### ServiceList
- [AccessAdministration+services](./AccessAdministration+services.yaml)

### ProfileList and ProfileInstanceList
- [AccessAdministration+profiles](./AccessAdministration+profiles.yaml)
- [AccessAdministration+profileInstances](./AccessAdministration+profileInstances.yaml)

### ForwardingList
- [AccessAdministration+forwardings](./AccessAdministration+forwardings.yaml)

### Open API specification (Swagger)
- [AccessAdministration](./AccessAdministration.yaml)

### CONFIGfile (JSON)
- [AccessAdministration+config](./AccessAdministration+config.json)

### LOADfile
It might make sense to structure an entry in the LOADfile as follows:  
- There is a userName that identifies the table entry in such a way that a human can associate it.  
- There is an Authentication code.  
- There is a list of tuples composed from {applicatioName, releaseNumber, operation, method} associated  with the Authentication code.  
- Asterisk is used to allow all values.  

Examples:
- Tuple for allowing an administrator to read and write all OaM paths:  
  {\*, \*, /core-model-1-4:control-construct\*, \*}
- Tuple for allowing an administrator to just read the OaM paths:  
  {\*, \*, /core-model-1-4:control-construct\*, read}
- Tuple for connecting APT (LinkVis) with the ALAP:  
  {AutomatedLinkAcceptanceProxy, \*, /v1/provide-acceptance-data-of-link-endpoint, \*}
- Several tuples are required for connecting the MultiDomainInventory with its Proxy:   
  {MultiDomainInventoryProxy, 1.0.0, /core-model-1-4:network-control-domain=cache/control-construct={mountName}\*, \*}
  {MultiDomainInventoryProxy, 1.0.0, /v1/provide-list-of-\*, \*}

### Comments
./.
