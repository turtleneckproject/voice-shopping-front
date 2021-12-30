// 학번 : 12161550
// 성명 : 김진우

#include <iostream>
#include <string>
#include <random>
using namespace std;

class Soldier {
private:
	string name = "";
	int grade = 0; // 1 : 이등병, 2 : 일병, 3 : 상병, 4 : 병장
	string hobby = "";

public:
	Soldier();
	Soldier(const string& name, int grade, const string& hobby);
	Soldier(const Soldier& std);
	~Soldier();

	string getName() const {
		return name;
	}
	int getGrade() const {
		return grade;
	}
	string getHobby() const {
		return hobby;
	}

	static int soldier_count; // 정적변수, 모두 객체가 공유
	static void PrintSoldierCount(); // 정적함수, 모두 객체가 공유
	string* p = new string[10]; // 동적 할당
};
Soldier::Soldier() { // default 생성자
	soldier_count++;
}
Soldier::~Soldier() { // 소멸자
	if (name == "성윤모")
		cout << name << "의병제대" << endl;
	else if (soldier_count == 0) {
		cout << "2중대 인원 : 0" << endl;
	}
	else
		cout << name << "전역" << endl;
}
Soldier::Soldier(const string& name, int grade, const string& hobby) { // 파라미터 생성자
	soldier_count++;
	*p = name;
	this->name = name;
	this->grade = grade;
	this->hobby = hobby;
	cout << name << "님의 입대를 환영합니다" << endl;
}
int Soldier::soldier_count = 0;
int Soldier::*p = 0;

void Soldier::PrintSoldierCount() {
	cout << "2중대 인원 : " << soldier_count << "\n";
}
void fun() { // 심진우 입대
	Soldier ci("심진우", 1, "작업");
	Soldier::PrintSoldierCount();
	// 함수가 종료되면 심진우 전역
}

int main() {
	Soldier ym("성윤모", 1, "롤리폴리");
	Soldier cb("차병호", 1, "축구");
	Soldier bm("박민석", 2, "복싱");
	Soldier yd("임다혜", 2, "뺑끼치기");
	Soldier ks("김상훈", 3, "무에타이");
	Soldier ci("최일구", 4, "격투기 시청");
	int len = Soldier::soldier_count;

	while (true) {
		cout << "1) 2중대 2) 취미/특기 3) 부대정렬 4) 실시간 마음의 편지 5) 종료 ?";
		int c = 0;
		cin >> c;
		if (c == 1) {
			Soldier::PrintSoldierCount();
			cout << ym.getName() << endl;
			cout << cb.getName() << endl;
			cout << bm.getName() << endl;
			cout << yd.getName() << endl;
			cout << ks.getName() << endl;
			cout << ci.getName() << endl;
			fun(); // 심진우 입대
		}
		else if (c == 2) {
			cout << ym.getName() << " " << ym.getGrade() << "의 취미(특기)는 " << ym.getHobby() << "입니다." << endl;
			cout << cb.getName() << " " << cb.getGrade() << "의 취미(특기)는 " << cb.getHobby() << "입니다." << endl;
			cout << bm.getName() << " " << bm.getGrade() << "의 취미(특기)는 " << bm.getHobby() << "입니다." << endl;
			cout << yd.getName() << " " << yd.getGrade() << "의 취미(특기)는 " << yd.getHobby() << "입니다." << endl;
			cout << ks.getName() << " " << ks.getGrade() << "의 취미(특기)는 " << ks.getHobby() << "입니다." << endl;
			cout << ci.getName() << " " << ci.getGrade() << "의 취미(특기)는 " << ci.getHobby() << "입니다." << endl;
		}
		else if (c == 3) {
			random_device rd;
			mt19937 gen(rd());
			int a = 0;
			int b = 0;
			cout << "행 입력 : ";
			cin >> a;
			cout << "열 입력 : ";
			cin >> b;
			uniform_int_distribution <int> distrib(1, 6);
			int line = 0;
			for (int i = 0; i < (a * b); i++) {
				if (distrib(gen) == 1) {
					line++;
					cout << ym.getName() << ' ';
				}
				else if (distrib(gen) == 2) {
					line++;
					cout << cb.getName() << ' ';
				}
				else if (distrib(gen) == 3) {
					line++;
					cout << bm.getName() << ' ';
				}
				else if (distrib(gen) == 4) {
					line++;
					cout << yd.getName() << ' ';
				}
				else if (distrib(gen) == 5) {
					line++;
					cout << ks.getName() << ' ';
				}
				else if (distrib(gen) == 6) {
					line++;
					cout << ci.getName() << ' ';
				}
				if (line % 5 == 0) {
					line = 0;
					cout << "\n";
				}
			}
		}
		else if (c == 4) {
			while (true) {
				string s = "";
				cout << ym.getName() << " 입력 : ";
				cin >> s;
				if (s.find("바보") == 1 || s.find("병신") || s.find("미친")) {
					cout << "(전송불가) ******************" << endl;
				}
				else {
					cout << "(전송됨)" << s << endl;
				}
				if (s == "끝")
					break;
			}
		}
		else if (c == 5) {
			cout << "* 전역을 축하드립니다 * " << endl;
			break;
		}
		else {
			cout << "메뉴에서 골라주세요." << endl;
		}
	}
	//욕설을 하면 블라인드 처리되면서 보내지지가 않음, 비속어 처리에 람다함수를 사용하심
	// 바보, 병신, 미친 3가지
	//(전송불가) *******************
	// 성윤모 입력 : 
	// 보내지면 (전송됨)
	// 끝을 입력하면 
	// 소멸자에 * 전역을 축하드립니다 *
	// () 전역
	// () 의병제대
	return 0;
}
//생성자 동작, static 변수 사용
// hobby가 작업