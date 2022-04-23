-- 创建数据库
DROP database if exists dataTest;
CREATE database dataTest CHARACTER SET utf8 COLLATE UTF8_unicode_ci;

-- 创建User表
CREATE TABLE `user` (
  `userName` varchar(255) NOT NULL,
  `nickName` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id` varchar(36) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 创建Role表
CREATE TABLE `role` (
  `id` varchar(36) NOT NULL,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `remark` varchar(500) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `menuId` varchar(1000) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- 创建menu表
CREATE TABLE `menu` (
  `id` varchar(36) NOT NULL,
  `parentId` varchar(36) NOT NULL,
  `name` varchar(30) NOT NULL,
  `icon` varchar(30) NOT NULL,
  `status` int NOT NULL DEFAULT '1',
  `remark` varchar(500) DEFAULT NULL,
  `hideInMenu` tinyint(1) NOT NULL DEFAULT 0,
  `hideInBreadcrumb` tinyint(1) NOT NULL DEFAULT 0,
  `create_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `update_time` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;