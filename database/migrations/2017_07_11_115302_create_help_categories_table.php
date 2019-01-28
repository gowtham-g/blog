<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHelpCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('help_categories', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->unique();
            $table->string('slug');
            $table->string('description');
            $table->string('color');
            $table->boolean('is_display_date')->comment('1=visible 0= invisible');
            $table->string('icon');
            $table->boolean('is_active')->comment('1=visible 0= invisible');
            $table->boolean('is_user_post')->comment('1 is post data to this list, :0 unable to post');
            $table->integer('parent_id')->unsigned()->index()->nullable();;
            $table->foreign('parent_id')->references('id')->on('help_categories')->onDelete('cascade');
            $table->boolean('is_display_disable')->default(0);
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
        Schema::dropIfExists('help_categories');
    }
}
