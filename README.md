# Ksike framework: Admin Js integration 

For further information consult the following links:

- https://docs.adminjs.co/installation/getting-started#overview
- https://docs.adminjs.co/installation/plugins/express
- https://docs.adminjs.co/installation/adapters/sequelize

## Install

- Set the configuration file: `cfg\core.json`

```json
{
  "onLoadedModules": ["ksmf.adminjs.wrapper"],
  "helper": {
      "ksmf.adminjs.wrapper": {
        "name": "ksmf-adminjs",
        "type": "lib",
        "dependency": {
          "helper": "helper"
        }
      }
  }
}
```
- Check the project URL at **/admin**

