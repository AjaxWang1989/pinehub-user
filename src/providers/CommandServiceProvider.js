import ServiceProvider from './ServiceProvider';
// 路由跳转命令
import RouterCommand from '@/commands/RouterCommand';
// 登录命令
import SignInCommand from '@/commands/SignInCommand';

// 购物车基类命令
import ShoppingCartCommand from '@/commands/ShoppingCartCommand';
// 扫描命令
import ScanCommand from '@/commands/ScanCommand';


// 清空产品命令（切换分类）
import ClearMerchandiseCommand from '@/commands/ClearMerchandiseCommand';

import LoadMerchandisesCommand from '@/commands/LoadMerchandisesCommand';
import LoadAccountCommand from '@/commands/LoadAccountCommand';

export default class CommandServiceProvider extends ServiceProvider {
    constructor (app) {
        super(app);
        this.commands = [];
    }
    register () {
        let commands = [
            RouterCommand,
            SignInCommand,
            ShoppingCartCommand,
            ScanCommand,
            ClearMerchandiseCommand,
            LoadMerchandisesCommand,
            LoadAccountCommand
        ];
        for (let key in commands) {
            this.app.registerCommand(commands[key].commandName(), commands[key]);
        }
    }
}
