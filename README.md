# Node con TypeScript - TS-Node-dev (preferido)

0. Instalar y crear nuestro package.json
```
npm init -y

```

1. Instalar TypeScript y demás dependencias
```
npm i -D typescript @types/node ts-node-dev rimraf
```
2. Inicializar el archivo de configuración de TypeScript ( Se puede configurar al gusto)
```
npx tsc --init --outDir dist/ --rootDir src
```

3. Crear scripts para dev, build y start ([Más sobre TS-Node-dev aquí](https://www.npmjs.com/package/ts-node-dev))
```
  "dev": "tsnd --respawn --clear src/app.ts",
  "build": "rimraf ./dist && tsc",
  "start": "npm run build && node dist/app.js"
```

4.  Packages i
```
npm i cron  = https://www.npmjs.com/package/cron

Sirve para crear rapidamente un CRUD de prueba en local
npm i json-server = https://www.npmjs.com/package/json-server

```




