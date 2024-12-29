<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {   
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique()->index();
            $table->text('title');
            $table->longText('description');
            $table->date('released');
            $table->timestamp('created_at')->nullable();;
        });
    
    
        // Add some example movies

        DB::table('movies')->insert([
            'slug' => 'lord-of-the-rings--the-fellowship-of-the-ring',
            'title' => 'The Lord of the Rings: The Fellowship of the Ring',
            'description' => 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
            'released' => '2001-12-19',
        ]);

        DB::table('movies')->insert([
            'slug' => 'lord-of-the-rings--the-two-towers',
            'title' => 'The Lord of the Rings: The Two Towers',
            'description' => 'While Frodo and Sam edge closer to Mordor with the help of the shifty Gollum, the divided fellowship makes a stand against Sauron\'s new ally, Saruman, and his hordes of Isengard.',
            'released' => '2002-12-18',
        ]);
    
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
