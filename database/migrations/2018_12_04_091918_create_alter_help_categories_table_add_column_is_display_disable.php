<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlterHelpCategoriesTableAddColumnIsDisplayDisable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('help_categories', function (Blueprint $table) {
            $table->boolean('is_display_disable')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('help_categories', function (Blueprint $table) {
             $table->dropColumn('is_display_disable');
        });
    }
}
