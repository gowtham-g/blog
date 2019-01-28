<?php
namespace App\Traits;

use Illuminate\Support\Facades\Storage;
use Illuminate\Filesystem\FileNotFoundException;
use Mockery\Exception;

trait FileTrait
{

    public function getFileData($file_disk_name, $file_path) {
        return Storage::disk($file_disk_name)->get($file_path);

    }

    public function fileExistCheck($file_disk_name, $file_path) {
        return Storage::disk($file_disk_name)->exists($file_path);
    }

    public function fileWrite($file_disk_name, $file_path, $file_contents) {
        try {
            return Storage::disk($file_disk_name)->put($file_path, $file_contents);
        } catch (Exception $exception) {
            return false;
        }
    }

    public function getAllFiles($file_disk_name, $file_path){
        try {
            return Storage::disk($file_disk_name)->allFiles($file_path);
        } catch (Exception $exception) {
            return false;
        }
    }

    public function fileDelete($file_disk_name, $file_path) {
        try {
            return Storage::disk($file_disk_name)->delete($file_path);
        } catch (Exception $exception) {
            return false;
        }
    }

    public function directoryCheck($file_disk_name,$dir_path){
        return Storage::disk($file_disk_name)->has($dir_path);
    }

    public function makeDirectory($file_disk_name,$dir_path){
        return Storage::disk($file_disk_name)->makeDirectory($dir_path);
    }

    public function directoryDelete($file_disk_name,$dir_path){
        return Storage::disk($file_disk_name)->deleteDirectory($dir_path);
    }

    public function fileUrlCheck($file_disk_name,$dir_path){
        return Storage::disk($file_disk_name)->url($dir_path);
    }

    public function directory_manipulate($name){
        $first_dir = substr($name, 0, 2);
        $second_dir = substr($name, 2, 2);
        $third_dir = substr($name, 4, 2);
        $full_dir = $third_dir . '/' . $first_dir . '/' . $second_dir.'/';
        return $full_dir;
    }

    function imageDiskPath($disk){
        return Storage::disk($disk)->url('/');
    }

    public function scopeFilterCategory($query,$category)
    {
        return $query->where('category_id',$category);
    }

    public function scopeFilterModule($query,$module)
    {
        return $query->where('module_id',$module);
    }

    public function scopeFilterIsPrime($query,$is_prime)
    {
        return $query->where('is_prime',$is_prime);
    }
    public function scopeFilterEditorCategory($query,$category)
    {
        return $query->where('editor_asset_master_id',$category);
    }

}