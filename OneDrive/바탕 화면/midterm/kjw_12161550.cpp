// �й� : 12161550
// ���� : ������

#include <iostream>
#include <string>
#include <random>
using namespace std;

class Soldier {
private:
	string name;
	int grade; // 1 : �̵, 2 : �Ϻ�, 3 : ��, 4 : ����
	string hobby;

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

	static int soldier_count;
	static void PrintSoldierCount();
};
Soldier::Soldier() {

}
Soldier::Soldier(const string& name, int grade, const string& hobby) {
	this->name = name;
	this->grade = grade;
	this->hobby = hobby;
	cout << name << "���� �Դ븦 ȯ���մϴ�" << endl;
}
int Soldier::soldier_count = 0;

void Soldier::PrintSoldierCount() {
	cout << "2�ߴ� �ο� : " << soldier_count << "\n";
}

int main() {
	Soldier ym("������", 1, "�Ѹ�����");
	Soldier cb("����ȣ", 1, "�౸");
	Soldier bm("�ڹμ�", 2, "����");
	Soldier yd("�Ӵ���", 2, "����ġ��");
	Soldier ks("�����", 3, "����Ÿ��");
	Soldier ci("���ϱ�", 4, "������ ��û");
	cout << "1) 2�ߴ� 2) ���/Ư�� 3) �δ����� 4) �ǽð� ������ ���� 5) ���� ?";
	int c = 0;
	cin >> c;
	if (c == 1) {
		cout << "2�ߴ� �ο� : " << Soldier::soldier_count << endl;
	}
	else if (c == 2) {
		cout << ym.getName() << " " << ym.getGrade() <<"�� ���(Ư��)�� " << ym.getHobby() << "�Դϴ�." << endl;
		cout << ym.getName() << " " << ym.getGrade() << "�� ���(Ư��)�� " << ym.getHobby() << "�Դϴ�." << endl;
		cout << ym.getName() << " " << ym.getGrade() << "�� ���(Ư��)�� " << ym.getHobby() << "�Դϴ�." << endl;
		cout << ym.getName() << " " << ym.getGrade() << "�� ���(Ư��)�� " << ym.getHobby() << "�Դϴ�." << endl;
		cout << ym.getName() << " " << ym.getGrade() << "�� ���(Ư��)�� " << ym.getHobby() << "�Դϴ�." << endl;
	}
	else if (c == 3) {

	}
	else if (c == 4) {

	}
	else if (c == 5) {

	}
	//�弳�� �ϸ� ����ε� ó���Ǹ鼭 ���������� ����, ��Ӿ� ó���� �����Լ��� ����Ͻ�
	// �ٺ�, ����, ��ģ
	//(���ۺҰ�) *******************
	// ������ �Է� : 
	// �������� (���۵�)
	// ���� �Է��ϸ� 
	// �Ҹ��ڿ� * ������ ���ϵ帳�ϴ� *
	// () ����
	// () �Ǻ�����
	return 0;
}
//������ ����, static ���� ���
// hobby�� �۾�