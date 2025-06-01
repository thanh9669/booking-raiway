export default {
    nav: [
        {
          name: "Quản lý chi tiêu",
          icon: "menu-icon tf-icons bx bx-home-circle",
          classData: "menu-link",
          classParent: "menu-item",
          url:"/monthly-expenses",
          child: []
        },
        {
          name: "Dashboard",
          icon: "menu-icon tf-icons bx bx-home-circle",
          classData: "menu-link",
          classParent: "menu-item",
          url:"/home",
          child: []
        },
        {
          name: "Quản lý bài viết",
          icon: "menu-icon tf-icons bx bx-home-circle",
          classData: "menu-link menu-toggle",
          classParent: "menu-item",
          url:"",
          child: [
            {
              name: "Danh sách bài viết",
              icon: "menu-icon tf-icons bx bx-home-circle",
              classData: "menu-link",
              classParent: "menu-item",
              url:"/news", 
              child:[]
            },
            {
              name: "Danh sách điểm đến",
              icon: "menu-icon tf-icons bx bx-home-circle",
              classData: "menu-link",
              classParent: "menu-item",
              url:"/trip", 
              child:[]
            }
          ]
        },
        {
          name: "Quản lý tài khoản",
          icon: "menu-icon tf-icons bx bx-user",
          classData: "menu-link",
          classParent: "menu-item",
          role: "admin",
          url:"/users",
          child: []
        },
        // {
        //   name: "Quản lý kho",
        //   icon: "menu-icon icon-base bx bx-cart-alt",
        //   classData: "menu-link menu-toggle",
        //   classParent: "menu-item",
        //   url:"",
        //   child: [
        //     {
        //       name: "Danh sách sản phẩm",
        //       icon: "menu-icon tf-icons bx bx-home-circle",
        //       classData: "menu-link",
        //       classParent: "menu-item",
        //       url:"/product", 
        //       child:[]
        //     },
        //     {
        //       name: "Danh sách danh mục",
        //       icon: "menu-icon tf-icons bx bx-home-circle",
        //       classData: "menu-link",
        //       classParent: "menu-item",
        //       url:"/trip", 
        //       child:[]
        //     },
        //     {
        //       name: "Danh sách nhap hang",
        //       icon: "menu-icon tf-icons bx bx-home-circle",
        //       classData: "menu-link",
        //       classParent: "menu-item",
        //       url:"/stock", 
        //       child:[]
        //     }
        //   ]
        // },
      ]
}
