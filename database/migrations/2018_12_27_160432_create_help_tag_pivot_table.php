<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHelpTagPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_tag_pivot', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('help_id')->unsigned()->index()->nullable();
            $table->foreign('help_id')->references('id')->on('helps')->onDelete('cascade');
            $table->integer('help_tag_id')->unsigned()->index()->nullable();
            $table->foreign('help_tag_id')->references('id')->on('help_tags')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('help_tag_pivot');
    }
}
