<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAlterHelpTableAddColumnHelpTagId extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('helps', function (Blueprint $table) {
            $table->integer('help_tag_id')->unsigned()->index()->nullable();
            $table->foreign('help_tag_id')->references('id')->on('help_tags')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('helps', function (Blueprint $table) {
            $table->dropForeign('helps_help_tag_id_foreign');
            $table->dropColumn('help_tag_id');
        });
    }
}
