<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHelpCommentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_comments', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('help_id')->unsigned()->index()->nullable();
            $table->foreign('help_id')->references('id')->on('helps');
            $table->integer('help_state_id')->unsigned()->index()->nullable();
            $table->foreign('help_state_id')->references('id')->on('help_states');
            $table->integer('user_id')->unsigned()->index()->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->string('description');
            $table->boolean('is_admin_post')->default(0);
            $table->timestamps();
            $table->softDeletes();
        });
    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('help_comments');
    }
}
