<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHelpTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
            Schema::create('helps', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title');
            $table->string('slug');
            $table->text('description');
            $table->integer('user_id')->unsigned()->index()->nullable();
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->integer('help_category_id')->unsigned()->index()->nullable();
            $table->foreign('help_category_id')->references('id')->on('help_categories')->onDelete('cascade');
            $table->integer('help_state_id')->unsigned()->index()->nullable()->default(1)->commend('waiting : 1');
            $table->foreign('help_state_id')->references('id')->on('help_states')->onDelete('cascade');
            $table->integer('approved_by')->unsigned()->index()->nullable();
            $table->foreign('approved_by')->references('id')->on('users')->onDelete('cascade');
            $table->dateTime('approved_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down()
    {
        Schema::dropIfExists('helps');
    }
}
