from training.models import UserActivity, UserActivityLog, do_training, Reward
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Sum

# Return current user (Dummy)
def get_user():
    return User.objects.first()

class ActivityListApi(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        # Custom attribute
        activity_name = serializers.CharField(source="activity.name")
        start_date = serializers.DateTimeField(source="activity.start_date")
        end_date = serializers.DateTimeField(source="activity.end_date")
        is_active = serializers.BooleanField(source="activity.is_active")

        class Meta:
            model = UserActivity
            fields = ["id", "activity_name", "completed", "start_date",
                      "end_date", "is_active"]
    
    def get(self, request):
        user = get_user()
        user_activities = UserActivity.objects.filter(user=user)
        serializer = self.OutputSerializer(user_activities, many=True)
        return Response(serializer.data)

class ActivityCompleteApi(APIView):
    def post(self, request, activity_id):
        user = get_user()
        activity_qs = UserActivity.objects.filter(id=activity_id, user=user)
        activity_qs.update(completed=True)
        score = do_training()
        UserActivityLog.objects.create(user_activity=activity_qs.first(), score=score)
        return Response({"score": score},status=201)

class ActivityDetailApi(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        name = serializers.CharField(source="activity.name")
        description = serializers.CharField(source="activity.description")

        class Meta:
            model = UserActivity
            fields = ["id", "name", "description",]
    
    def get(self, request, activity_id):
        user = get_user()
        user_activity = UserActivity.objects.get(user=user, id=activity_id)
        serializer = self.OutputSerializer(user_activity)
        return Response(serializer.data)
        
class LeaderboardApi(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        total_score = serializers.IntegerField()

        class Meta:
            model = User
            fields = ["id", "first_name", "total_score"]

    def get(self, request):
        activity_qs = User.objects.all()\
            .annotate(total_score=Sum("useractivity__useractivitylog__score"))\
            .order_by("-total_score")
        serializer = self.OutputSerializer(activity_qs, many=True)

        return Response(serializer.data)
    
class RewardListApi(APIView):
    class OutputSerializer(serializers.ModelSerializer):
        class Meta:
            model = Reward
            fields = ["id", "name", "description", "score_to_unlock"]

    def get(self, request):
        rewards = Reward.objects.all()
        serializer = self.OutputSerializer(rewards, many=True)
        return Response(serializer.data)

class ScoreApi(APIView):
    def get(self, request):
        user = get_user()
        score = UserActivityLog.objects.filter(user_activity__user=user).aggregate(Sum("score"))["score__sum"]
        return Response({"score": score})