<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        try {
            $user = Auth::user();
            $pendingTask = Task::query()->where('status', 'pending')->count();
            $myPendingTask = Task::query()
                ->where('status', 'pending')
                ->where('assigned_user_id', $user->id)
                ->count();
            $inProgressTask = Task::query()->where('status', 'in_progress')->count();
            $myProgressTask = Task::query()
                ->where('status', 'in_progress')
                ->where('assigned_user_id', $user->id)
                ->count();
            $completedTask = Task::query()->where('status', 'completed')->count();
            $myCompletedTask = Task::query()
                ->where('status', 'completed')
                ->where('assigned_user_id', $user->id)
                ->count();
            $myActiveTasks = Task::query()
                ->whereIn('status', ['pending', 'in_progress'])
                ->where('assigned_user_id', $user->id)
                ->limit(10)
                ->get();
            $activeTasks = TaskResource::collection($myActiveTasks);

            return Inertia::render('Dashboard', compact('pendingTask', 'myPendingTask', 'inProgressTask', 'myProgressTask', 'completedTask', 'myCompletedTask', 'activeTasks'));
        } catch (\Exception $e) {
            // Log::error($e->getMessage());
            return Inertia::render('Dashboard', ['error' => 'An error occurred while fetching dashboard data.']);
        }
    }
}

