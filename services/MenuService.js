const { Menu } = require('../models');

module.exports = {
  create: async (body) => {
    // delete previous menu
    await Menu.deleteMany();
    // create new menu
    const newMenu = await new Menu(body).save();
    return newMenu;
  },
  getMenu: () => Menu.find(),
};
