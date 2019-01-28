<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHelpStatePivotsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_state_pivots', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('help_category_id')->unsigned()->index()->nullable();
            $table->foreign('help_category_id')->references('id')->on('help_categories')->onDelete('cascade');
            $table->integer('help_state_id')->unsigned()->index()->nullable();
            $table->foreign('help_state_id')->references('id')->on('help_states')->onDelete('cascade');
            $table->boolean('is_negative')->default(0);
            $table->integer('order_by')->default(0);
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
        Schema::dropIfExists('help_state_pivots');
    }
}
