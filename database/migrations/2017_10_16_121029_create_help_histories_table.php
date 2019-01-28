<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHelpHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_histories', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('help_id')->unsigned()->index()->nullable();;
            $table->foreign('help_id')->references('id')->on('helps')->onDelete('cascade');
            $table->integer('help_state_id')->unsigned()->index()->nullable();;
            $table->foreign('help_state_id')->references('id')->on('help_states')->onDelete('cascade');
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
        Schema::dropIfExists('help_histories');
    }
}
