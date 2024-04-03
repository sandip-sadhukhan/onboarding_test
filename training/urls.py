from django.urls import path
from training import apis

urlpatterns = [
    path('api/activities/', apis.ActivityListApi.as_view()),
    path('api/leaderboard/', apis.LeaderboardApi.as_view()),
    path('api/rewards/', apis.RewardListApi.as_view()),
    path('api/activity/complete/<int:activity_id>/', apis.ActivityCompleteApi.as_view()),
    path('api/activity/<int:activity_id>/', apis.ActivityDetailApi.as_view()),
    path('api/activity/complete/', apis.ActivityCompleteApi.as_view()),
    path('api/score/', apis.ScoreApi.as_view()),
]
