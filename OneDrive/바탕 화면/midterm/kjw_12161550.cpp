// �й� : 12161550
// ���� : ������

#include <iostream>
#include <string>
#include <random>
using namespace std;

class Soldier {
private:
	string name = "";
	int grade = 0; // 1 : �̵, 2 : �Ϻ�, 3 : ��, 4 : ����
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

	static int soldier_count; // ��������, ��� ��ü�� ����
	static void PrintSoldierCount(); // �����Լ�, ��� ��ü�� ����
	int* p = new int[10]; // ���� �Ҵ�
};
Soldier::Soldier() { // default ������
	soldier_count++;
}
Soldier::~Soldier() { // �Ҹ���
	if (name == "������")
		cout << name << "�Ǻ�����" << endl;
	else if (soldier_count == 0) {
		cout << "2�ߴ� �ο� : 0" << endl;
	}
	else
		cout << name << "����" << endl;
}
Soldier::Soldier(const string& name, int grade, const string& hobby) { // �Ķ���� ������
	soldier_count++;
	this->name = name;
	this->grade = grade;
	this->hobby = hobby;
	cout << name << "���� �Դ븦 ȯ���մϴ�" << endl;
}
int Soldier::soldier_count = 0;
int Soldier::*p = 0;

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
	int len = Soldier::soldier_count;
	p[0] = 

	while (true) {
		cout << "1) 2�ߴ� 2) ���/Ư�� 3) �δ����� 4) �ǽð� ������ ���� 5) ���� ?";
		int c = 0;
		cin >> c;
		if (c == 1) {
			Soldier::PrintSoldierCount();
			cout << ym.getName() << endl;
		}
		else if (c == 2) {
			cout << ym.getName() << " " << ym.getGrade() << "�� ���(Ư��)�� " << ym.getHobby() << "�Դϴ�." << endl;
			cout << cb.getName() << " " << cb.getGrade() << "�� ���(Ư��)�� " << cb.getHobby() << "�Դϴ�." << endl;
			cout << bm.getName() << " " << bm.getGrade() << "�� ���(Ư��)�� " << bm.getHobby() << "�Դϴ�." << endl;
			cout << yd.getName() << " " << yd.getGrade() << "�� ���(Ư��)�� " << yd.getHobby() << "�Դϴ�." << endl;
			cout << ks.getName() << " " << ks.getGrade() << "�� ���(Ư��)�� " << ks.getHobby() << "�Դϴ�." << endl;
			cout << ci.getName() << " " << ci.getGrade() << "�� ���(Ư��)�� " << ci.getHobby() << "�Դϴ�." << endl;

		}
		else if (c == 3) {
			random_device rd;
			mt19937 gen(rd());
			int a = 0;
			int b = 0;
			cout << "�� �Է� : ";
			cin >> a;
			cout << "�� �Է� : ";
			cin >> b;
			uniform_int_distribution <int> distrib(1, 6);
			int line = 0;
			for (int i = 0; i < a; i++) {
				for (int j = 0; j < b; j++) {
					if (line % 5 == 0) {
						line = 0;
						cout << "\n";
					}
					if (distrib(gen) == 1) {
						cout << ym.getName() << ' ';
					}
					else if (distrib(gen) == 2) {
						cout << cb.getName() << ' ';
					}
					else if (distrib(gen) == 3) {
						cout << bm.getName() << ' ';
					}
					else if (distrib(gen) == 4) {
						cout << yd.getName() << ' ';
					}
					else if (distrib(gen) == 5) {
						cout << ks.getName() << ' ';
					}
					else if (distrib(gen) == 6) {
						cout << ci.getName() << ' ';
					}
				}
			}
		}
		else if (c == 4) {
			while (true) {
				string s = "";
				cout << ym.getName() << " �Է� : ";
				cin >> s;
				if (s.find("�ٺ�") || s.find("����") || s.find("��ģ")) {
					cout << "(���ۺҰ�) ******************" << endl;
				}
				else {
					cout << "(���۵�)" << s << endl;
				}
				if (s == "��")
					break;
			}
		}
		else if (c == 5) {
			cout << "* ������ ���ϵ帳�ϴ� * " << endl;
			break;
		}
		else {
			cout << "�޴����� ����ּ���." << endl;
		}
	}
	//�弳�� �ϸ� ����ε� ó���Ǹ鼭 ���������� ����, ��Ӿ� ó���� �����Լ��� ����Ͻ�
	// �ٺ�, ����, ��ģ 3����
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