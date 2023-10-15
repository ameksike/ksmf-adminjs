/**
 * @author		Antonio Membrides Espinosa
 * @email		tonykssa@gmail.com
 * @date		15/10/2023
 * @copyright  	Copyright (c) 2020-2030
 * @license    	GPL
 * @version    	1.0
 * @requires    adminjs
 * @requires    @adminjs/express
 * @requires    @adminjs/sequelize
 **/
const KsMf = require('ksmf');
class AdminJsModule extends KsMf.app.Module {

    init() {
        this.rest = false;
        super.init();
    }

    async onLoadedModules() {
        const app = this.helper.get('app');
        const dao = this.helper.get('dao');
        const logger = this.helper.get('logger');
        const web = app.web;
        try {
            const [{ default: AdminJS }, { default: AdminJSExpress }, { default: AdminJSSequelize }] = await Promise.all([
                import('adminjs'),
                import('@adminjs/express'),
                import('@adminjs/sequelize')
            ]);
            AdminJS.registerAdapter({
                Resource: AdminJSSequelize?.Resource,
                Database: AdminJSSequelize?.Database,
            });
            const admin = new AdminJS({
                resources: Object.values(dao.models)
            });
            const adminRouter = AdminJSExpress.buildRouter(admin);
            web.use(admin.options.rootPath, adminRouter);
            logger?.info({
                src: "Ksmf:Adminjs:onLoadedModules",
                data: {
                    models: Object.keys(dao.models),
                    path: admin.options.rootPath
                }
            });
        }
        catch (error) {
            logger?.error({
                src: "Ksmf:Adminjs:onLoadedModules",
                error: error.message || error
            });
        }
    }
}

module.exports = AdminJsModule;
