<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RoleAndPermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create([ "name" => 'manage_options' ] );
        Permission::create([ "name" => 'view_users' ] );
        Permission::create([ "name" => 'create_users' ] );
        Permission::create([ "name" => 'edit_users' ] );
        Permission::create([ "name" => 'delete_users' ] );

        $adminRole = Role::create(['name' => 'Admin']);
        $vendorRole = Role::create(['name' => 'Vendor']);
        $customerRole = Role::create(['name' => 'Customer']);
        $userRole = Role::create(['name' => 'User']);

        $adminRole->givePermissionTo([
            "manage_options",
        ]);
    }

}
